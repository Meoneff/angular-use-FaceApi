const video = document.getElementById("video");
const users = [
  {
      id: "map",
      name: 'Nguyễn Minh Khoa',
      date: new Date('2021-09-01')

  },
  {
      id: "hau",
      name: 'Bùi Phúc Hậu',
      date: new Date('2021-09-01')
  },
  {
      id: "phun",
      name: 'Phùng Minh Khoa',
      date: new Date('2021-09-01')
  },
  {
      id: "beo",
      name: 'Nguyễn Minh Khôi',
      date: new Date('2021-09-01')
  },
  {
      id: "duy",
      name: 'Hà Hoàng Duy',
      date: new Date('2021-09-01')
  }

];
const workSheetColumnName = [
  "ID",
  "Name",
  "Date"
]
const workSheetName = 'Users';
const filePath = './excel-from-js.xlsx';


const attendances = [];


Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("assets/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("assets/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("assets/models"),
]).then();



function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
}

function stopWebcam() {
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  video.srcObject = null;
  const canvas = document.getElementById("myCanvas");

  // Remove the canvas by ID
  canvas.remove();
  const data = {
    users:attendances,
    workSheetName: `Attendance_${new Date().toLocaleDateString().split('/').join('-')}`,
    
    filePath: `../../Attendance_${new Date().toLocaleDateString().split('/').join('-')}.xlsx`,
    workSheetColumnName: [
      "ID",
      "Name",
      "Date"
    ]
    
  }
  const jsonData = JSON.stringify(data);
  fetch('http://localhost:3000/excel/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: jsonData
})
  .then(response => response.text()) // Change to .text() to handle boolean response
  .then(data => {
    if (data === 'true') {
      alert('Excel file created successfully.');
    } else {
      alert('Failed to create Excel file.');
    }
  })
  .catch(error => {
    console.error(error);
  });
  console.log(attendances);
}



function getLabeledFaceDescriptions() {
  const labels = ["map","beo","phun","hau","duy"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 12; i++) {
        const img = await faceapi.fetchImage(`assets/labels/${label}/${i}.jpg`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      console.log(new faceapi.LabeledFaceDescriptors(label, descriptions));
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

video.addEventListener("play", async () => {
  const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

  const canvas = faceapi.createCanvasFromMedia(video);
  canvas.id = 'myCanvas'; // Assign the ID 'myCanvas'
  document.body.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    const results = resizedDetections.map((d) => {
      return faceMatcher.findBestMatch(d.descriptor);
    });

    results.forEach((result, i) => {
      console.log(result);
      if(result.distance <0.45){
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.label,
        });
          const foundUser = users.find(user => user.id === result.label);
          if (foundUser) {
            console.log("User found:", foundUser);
            if(!attendances.includes(foundUser)){
              attendances.push(foundUser);
            }
          } else {
            console.log("User with ID", targetId, "not found.");
          }
        drawBox.draw(canvas);
      }else{
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: "unknown",
        });
        drawBox.draw(canvas);
      }

    });
  }, 100);
});