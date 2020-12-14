let mainGraph
let checkbox = document.getElementById("shouldShowAntsBoxID")
let showBestSolutionCheckBox = document.getElementById("shouldShowBestSolutionBoxID")
let vertexCountSlider = document.getElementById("vertexCountSliderID")
let vertexCountLabel = document.getElementById("vertexCountLabelID")
let resetButton = document.getElementById("resetButtonID")
let newVertexCount = 20
let shouldReset = false

updateVertexCountLabel = function(count) {
  vertexCountLabel.innerHTML = "Anzahl der Städte: "+ count +"🏙"
}

reset = function() {
  mainGraph = new Graph(newVertexCount, 5)
}

vertexCountSlider.oninput = function() {
  newVertexCount = this.value
  updateVertexCountLabel(newVertexCount)
  shouldReset = true;
}

resetButton.onclick = function() {
  shouldReset = true
}

setup = function() {
  updateVertexCountLabel(newVertexCount)
  createCanvas(400, 400)
  reset()
}

draw = function() {
  background(220, 220, 255)
  mainGraph.update()
  mainGraph.draw()
  mainGraph.setShouldShowAnts(checkbox.checked)
  mainGraph.setShouldShowBestSolution(showBestSolutionCheckBox.checked)
  if (shouldReset) {
    reset()
    shouldReset = false
  }
}
