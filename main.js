var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var nearbyChecked = false;
var exactPositionChecked = false;
var randomPositionChecked = false;
var audio = new Audio("719941__davejf__soft-music.mp3");
audio.play();

// functions for drawing   shapes///

//  circle //
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x || canvas.width / 2, y || canvas.height / 2, 50, 0, 2 * Math.PI);
  ctx.fillStyle = "blue"; // Fill color
  ctx.fill();
  ctx.stroke();
}

// square //
function drawSquare(x, y) {
  ctx.beginPath();
  ctx.rect(
    (x || canvas.width / 2) - 50,
    (y || canvas.height / 2) - 50,
    100,
    100
  );
  ctx.fillStyle = "green"; // Fill color
  ctx.fill();
  ctx.stroke();
}

// triangle //
function drawTriangle(x, y) {
  ctx.beginPath();
  ctx.moveTo(x || canvas.width / 2, (y || canvas.height / 2) - 50);
  ctx.lineTo((x || canvas.width / 2) - 50, (y || canvas.height / 2) + 50);
  ctx.lineTo((x || canvas.width / 2) + 50, (y || canvas.height / 2) + 50);
  ctx.closePath();
  ctx.fillStyle = "red"; // Fill color
  ctx.fill();
  ctx.stroke();
}

// pentagon //
function drawPentagon(x, y) {
  ctx.beginPath();
  ctx.moveTo(
    (x || canvas.width / 2) + 50 * Math.cos(0),
    (y || canvas.height / 2) + 50 * Math.sin(0)
  );
  for (var i = 1; i <= 5; i++) {
    ctx.lineTo(
      (x || canvas.width / 2) + 50 * Math.cos((i * 2 * Math.PI) / 5),
      (y || canvas.height / 2) + 50 * Math.sin((i * 2 * Math.PI) / 5)
    );
  }
  ctx.closePath();
  ctx.fillStyle = "yellow"; // Fill color
  ctx.fill();
  ctx.stroke();
}

// hexagon //
function drawHexagon(x, y) {
  ctx.beginPath();
  ctx.moveTo((x || canvas.width / 2) + 50, y || canvas.height / 2);
  for (var i = 1; i <= 6; i++) {
    ctx.lineTo(
      (x || canvas.width / 2) + 50 * Math.cos((i * 2 * Math.PI) / 6),
      (y || canvas.height / 2) + 50 * Math.sin((i * 2 * Math.PI) / 6)
    );
  }
  ctx.closePath();
  ctx.fillStyle = "orange"; // Fill color
  ctx.fill();
  ctx.stroke();
}

// octagon //
function drawOctagon(x, y) {
  ctx.beginPath();
  ctx.moveTo((x || canvas.width / 2) + 50, y || canvas.height / 2);
  for (var i = 1; i <= 8; i++) {
    ctx.lineTo(
      (x || canvas.width / 2) + 50 * Math.cos((i * 2 * Math.PI) / 8),
      (y || canvas.height / 2) + 50 * Math.sin((i * 2 * Math.PI) / 8)
    );
  }
  ctx.closePath();
  ctx.fillStyle = "purple"; // Fill color
  ctx.fill();
  ctx.stroke();
}

// star //
function drawStar(x, y) {
  ctx.beginPath();
  for (var i = 0; i < 5; i++) {
    ctx.lineTo(
      (x || canvas.width / 2) + Math.cos(((18 + i * 72) / 180) * Math.PI) * 50,
      (y || canvas.height / 2) - Math.sin(((18 + i * 72) / 180) * Math.PI) * 50
    );
    ctx.lineTo(
      (x || canvas.width / 2) + Math.cos(((54 + i * 72) / 180) * Math.PI) * 20,
      (y || canvas.height / 2) - Math.sin(((54 + i * 72) / 180) * Math.PI) * 20
    );
  }
  ctx.closePath();
  ctx.fillStyle = "pink"; // Fill color
  ctx.fill();
  ctx.stroke();
}

// heart //
function drawHeart(x, y) {
  var blockSize = Math.min(canvas.width / 3, canvas.height / 3);
  var heartSize = blockSize * 0.7;

  ctx.beginPath();
  ctx.moveTo(x || canvas.width / 2, (y || canvas.height / 2) - heartSize / 4);
  ctx.quadraticCurveTo(
    (x || canvas.width / 2) - heartSize / 2,
    (y || canvas.height / 2) - heartSize / 2,
    (x || canvas.width / 2) - heartSize / 2,
    y || canvas.height / 2
  );
  ctx.quadraticCurveTo(
    (x || canvas.width / 2) - heartSize / 2,
    (y || canvas.height / 2) + heartSize / 4,
    x || canvas.width / 2,
    (y || canvas.height / 2) + heartSize / 2
  );
  ctx.quadraticCurveTo(
    (x || canvas.width / 2) + heartSize / 2,
    (y || canvas.height / 2) + heartSize / 4,
    (x || canvas.width / 2) + heartSize / 2,
    y || canvas.height / 2
  );
  ctx.quadraticCurveTo(
    (x || canvas.width / 2) + heartSize / 2,
    (y || canvas.height / 2) - heartSize / 2,
    x || canvas.width / 2,
    (y || canvas.height / 2) - heartSize / 4
  );

  ctx.closePath();

  ctx.fillStyle = "red"; // Fill color
  ctx.fill();
  ctx.stroke();
}

function drawDiamond(x, y) {
  ctx.beginPath();
  ctx.moveTo(x || canvas.width, (y || canvas.height) - 50);
  ctx.lineTo((x || canvas.width / 2) + 50, y || canvas.height / 2);
  ctx.lineTo(x || canvas.width / 2, (y || canvas.height / 2) + 50);
  ctx.lineTo((x || canvas.width / 2) - 50, y || canvas.height / 2);
  ctx.closePath();
  ctx.fillStyle = "magenta"; // Fill color
  ctx.fill();
  ctx.stroke();
}

function toggleDropdown(dropdownId) {
  var dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("show");
}

document.addEventListener("click", function (event) {
  if (!event.target.matches(".dropdown-select")) {
    var dropdowns = document.getElementsByClassName("dropdown-options");
    for (var i = 0; i < dropdowns.length; i++) {
      var dropdown = dropdowns[i];
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    }
  }
});
// to select one cheeckbox at a time //

document
  .getElementById("nearbyCheckbox")
  .addEventListener("click", function () {
    if (this.checked) {
      document.getElementById("exactPositionCheckbox").checked = false;
      document.getElementById("randomPositionCheckbox").checked = false;
      clearCanvasAndGenerateShapes();
    }
  });

document
  .getElementById("exactPositionCheckbox")
  .addEventListener("click", function () {
    if (this.checked) {
      document.getElementById("nearbyCheckbox").checked = false;
      document.getElementById("randomPositionCheckbox").checked = false;
      clearCanvasAndGenerateShapes();
    }
  });

document
  .getElementById("randomPositionCheckbox")
  .addEventListener("click", function () {
    if (this.checked) {
      document.getElementById("nearbyCheckbox").checked = false;
      document.getElementById("exactPositionCheckbox").checked = false;
      clearCanvasAndGenerateShapes();
    }
  });

// function to draw at random position //

function drawRandomShape(shape, blockIndex) {
  var nearbyCheckbox = document.getElementById("nearbyCheckbox");
  var exactPositionCheckbox = document.getElementById("exactPositionCheckbox");
  var randomPositionCheckbox = document.getElementById(
    "randomPositionCheckbox"
  );

  // Check if either checkbox is checked
  if (
    !nearbyCheckbox.checked &&
    !exactPositionCheckbox.checked &&
    !randomPositionCheckbox.checked
  ) {
    alert("Please select a checkbox before drawing a shape.");
    return;
  }

  var uniquePositions = generateUniquePositions();
  var position;

  if (document.getElementById("exactPositionCheckbox").checked) {
    position = uniquePositions[blockIndex];
  } else {
    position = generateRandomPosition();
  }

  // Push the information about the newly selected shape to the array
  drawnShapes.push({ shape: shape, x: position.x, y: position.y });

  // Redraw all previously selected shapes
  for (var i = 0; i < drawnShapes.length; i++) {
    drawShape(drawnShapes[i].shape, drawnShapes[i].x, drawnShapes[i].y);
  }
}

function clearCanvasAndGenerateShapes() {
  clearCanvas();
  drawnShapes = []; // Reset the array of drawn shapes
  if (document.getElementById("nearbyCheckbox").checked) {
    // Generate shapes based on nearby positions
    for (var i = 0; i < 9; i++) {
      drawRandomShape(getRandomShape(), i);
    }
  } else if (document.getElementById("exactPositionCheckbox").checked) {
    // Generate shapes based on exact positions
    for (var i = 0; i < 9; i++) {
      drawRandomShape(getRandomShape(), i);
    }
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Define a global array to store the information about previously drawn shapes
var drawnShapes = [];

function generateRandomPosition() {
  var blockSize = canvas.width / 3;
  var position = {
    x: Math.random() * (canvas.width - blockSize) + blockSize / 2,
    y: Math.random() * (canvas.height - blockSize) + blockSize / 2,
  };
  return position;
}

function drawShape(shape, x, y) {
  switch (shape) {
    case "Circle":
      drawCircle(x, y);
      break;
    case "Square":
      drawSquare(x, y);
      break;
    case "Triangle":
      drawTriangle(x, y);
      break;
    case "Pentagon":
      drawPentagon(x, y);
      break;
    case "Hexagon":
      drawHexagon(x, y);
      break;
    case "Octagon":
      drawOctagon(x, y);
      break;
    case "Star":
      drawStar(x, y);
      break;
    case "Heart":
      drawHeart(x, y);
      break;
    case "Diamond":
      drawDiamond(x, y);
      break;
    default:
      console.error("Invalid shape");
  }
}

// exact position //////
function generateUniquePositions() {
  // Define fixed positions for each shape
  var blockSize = canvas.width / 3;
  var positions = [
    { x: blockSize / 2, y: blockSize / 2 }, // Circle
    { x: blockSize + blockSize / 2, y: blockSize / 2 }, // Square
    { x: 2 * blockSize + blockSize / 2, y: blockSize / 2 }, // Triangle
    { x: blockSize / 2, y: blockSize + blockSize / 2 }, // Pentagon
    { x: blockSize + blockSize / 2, y: blockSize + blockSize / 2 }, // Hexagon
    { x: 2 * blockSize + blockSize / 2, y: blockSize + blockSize / 2 }, // Octagon
    { x: blockSize / 2, y: 2 * blockSize + blockSize / 2 }, // Star
    { x: blockSize + blockSize / 2, y: 2 * blockSize + blockSize / 2 }, // Heart
    {
      x: 2 * blockSize + blockSize / 2,
      y: 2 * blockSize + blockSize / 2,
    }, // Diamond
  ];

  return positions;
}

// nearby .........................///

// Define variables to keep track of the dragged shape and its offset
var draggedShape = null;
var offsetX, offsetY;

// Function to handle mouse down event
function handleMouseDown(e) {
  // Get the mouse coordinates relative to the canvas
  var mouseX = e.clientX - canvas.getBoundingClientRect().left;
  var mouseY = e.clientY - canvas.getBoundingClientRect().top;

  // Check if the mouse is within any of the drawn shapes
  for (var i = 0; i < drawnShapes.length; i++) {
    var shape = drawnShapes[i];
    if (
      mouseX > shape.x &&
      mouseX < shape.x + 100 && // Assuming shapes are 100x100
      mouseY > shape.y &&
      mouseY < shape.y + 100
    ) {
      // Set the dragged shape and calculate the offset
      draggedShape = shape;
      offsetX = mouseX - shape.x;
      offsetY = mouseY - shape.y;
      break;
    }
  }
}

// Function to handle mouse move event during dragging
function handleMouseMove(e) {
  // Check if a shape is being dragged
  if (draggedShape !== null) {
    // Get the mouse coordinates relative to the canvas
    var mouseX = e.clientX - canvas.getBoundingClientRect().left;
    var mouseY = e.clientY - canvas.getBoundingClientRect().top;

    // Snap the shape to the nearest block
    var blockSize = canvas.width / 3;
    var blockX = Math.floor(mouseX / blockSize);
    var blockY = Math.floor(mouseY / blockSize);
    var newShapeX = blockX * blockSize + blockSize / 2;
    var newShapeY = blockY * blockSize + blockSize / 2;

    // Check if the new position overlaps with any other shape
    if (!doesShapeOverlap(newShapeX, newShapeY)) {
      // Update the position of the dragged shape
      draggedShape.x = newShapeX;
      draggedShape.y = newShapeY;

      // Redraw the canvas to reflect the updated position
      clearCanvas();
      for (var i = 0; i < drawnShapes.length; i++) {
        var shape = drawnShapes[i];
        drawShape(shape.shape, shape.x, shape.y);
      }
    }
  }
}

// Add event listeners for mouse events
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);

// Function to check if a shape overlaps with any other shape
function doesShapeOverlap(x, y) {
  for (var i = 0; i < drawnShapes.length; i++) {
    var shape = drawnShapes[i];
    if (Math.abs(shape.x - x) < 100 && Math.abs(shape.y - y) < 100) {
      return true; // Shapes overlap
    }
  }
  return false; // No overlap
}

//  randomposition////

document
  .getElementById("randomPositionCheckbox")
  .addEventListener("click", function () {
    if (this.checked) {
      // Add event listeners for mouse events only when randomPositionCheckbox is checked
      canvas.addEventListener("mousedown", MouseDown);
      canvas.addEventListener("mousemove", MouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    }
  });

// Function to handle mouse down event
function MouseDown(e) {
  // Get the mouse coordinates relative to the canvas
  var mouseX = e.clientX - canvas.getBoundingClientRect().left;
  var mouseY = e.clientY - canvas.getBoundingClientRect().top;

  // Check if the mouse is within any of the drawn shapes
  for (var i = 0; i < drawnShapes.length; i++) {
    var shape = drawnShapes[i];
    if (
      mouseX > shape.x &&
      mouseX < shape.x + 100 && // Assuming shapes are 100x100
      mouseY > shape.y &&
      mouseY < shape.y + 100
    ) {
      // Set the dragged shape and calculate the offset
      draggedShape = shape;
      offsetX = mouseX - shape.x;
      offsetY = mouseY - shape.y;
      break;
    }
  }
}

// Function to handle mouse move event
function MouseMove(e) {
  // Check if randomPositionCheckbox is checked
  if (document.getElementById("randomPositionCheckbox").checked) {
    // Check if a shape is being dragged
    if (draggedShape !== null) {
      // Get the mouse coordinates relative to the canvas
      var mouseX = e.clientX - canvas.getBoundingClientRect().left;
      var mouseY = e.clientY - canvas.getBoundingClientRect().top;

      // Update the position of the dragged shape
      draggedShape.x = mouseX - offsetX;
      draggedShape.y = mouseY - offsetY;

      // Check for collisions with other shapes
      for (var i = 0; i < drawnShapes.length; i++) {
        if (
          drawnShapes[i] !== draggedShape &&
          shapesCollide(draggedShape, drawnShapes[i])
        ) {
          // Apply a small random displacement to simulate the vibration effect
          draggedShape.x += Math.random() * 10 - 5;
          draggedShape.y += Math.random() * 10 - 5;

          // Check again for collisions with other shapes after displacement
          for (var j = 0; j < drawnShapes.length; j++) {
            if (
              drawnShapes[j] !== draggedShape &&
              shapesCollide(draggedShape, drawnShapes[j])
            ) {
              // If still colliding, reset position to original
              draggedShape.x -= offsetX;
              draggedShape.y -= offsetY;
              break;
            }
          }
          break;
        }
      }

      // Redraw the canvas to reflect the updated position
      clearCanvas();
      for (var i = 0; i < drawnShapes.length; i++) {
        var shape = drawnShapes[i];
        drawShape(shape.shape, shape.x, shape.y);
      }
    }
  }
}

// Function to check if two shapes collide
function shapesCollide(shape1, shape2) {
  return (
    shape1.x < shape2.x + 100 &&
    shape1.x + 100 > shape2.x &&
    shape1.y < shape2.y + 100 &&
    shape1.y + 100 > shape2.y
  );
}

// //// common mouseup for all checkboxes/////
// Function to handle mouse up event
function handleMouseUp() {
  // Check if a shape is being dragged
  if (draggedShape !== null) {
    if (document.getElementById("randomPositionCheckbox").checked) {
      // Check for collisions with other shapes
      for (var i = 0; i < drawnShapes.length; i++) {
        if (
          drawnShapes[i] !== draggedShape &&
          shapesCollide(draggedShape, drawnShapes[i])
        ) {
          // Calculate the displacement vector to separate the colliding shapes
          var dx = draggedShape.x - drawnShapes[i].x;
          var dy = draggedShape.y - drawnShapes[i].y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          // Minimum distance to prevent overlap (assuming shapes are 100x100)
          var minDistance = 100;

          // Calculate the displacement required to separate the shapes
          var displacementX = (dx / distance) * (minDistance + 1);
          var displacementY = (dy / distance) * (minDistance + 1);

          // Apply the displacement to the dragged shape
          draggedShape.x += displacementX;
          draggedShape.y += displacementY;

          // Redraw the canvas to reflect the updated position
          clearCanvas();
          for (var j = 0; j < drawnShapes.length; j++) {
            var shape = drawnShapes[j];
            drawShape(shape.shape, shape.x, shape.y);
          }

          // Exit the loop after handling the collision
          break;
        }
      }
    }
  }

  // Reset the dragged shape to null when the mouse is released
  draggedShape = null;
}
