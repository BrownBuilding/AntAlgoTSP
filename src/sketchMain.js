let checkbox = document.getElementById("shouldShowAntsBoxID")
let showBestSolutionCheckBox = document.getElementById("shouldShowBestSolutionBoxID")
let vertexCountSlider = document.getElementById("vertexCountSliderID")
let vertexCountLabel = document.getElementById("vertexCountLabelID")
let resetButton = document.getElementById("resetButtonID")
let newVertexCount = 20
let shouldReset = false
let mainGraph
let mainGraphRenderer

updateVertexCountLabel = function(count) {
  vertexCountLabel.innerHTML = "Number of Vertices:\t" + count
}

reset = function() {
  mainGraph = new Graph(newVertexCount, 5)
  mainGraphRenderer.setGraph(mainGraph)
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
  mainGraphRenderer = new GraphRenderer(mainGraph)
  reset()
}

draw = function() {
  background(220, 220, 255)
  mainGraph.update()
  mainGraphRenderer.setShouldDrawSolutions(checkbox.checked)
  mainGraphRenderer.setShouldDrawBestSolution(showBestSolutionCheckBox.checked)
  mainGraphRenderer.draw()
  if (shouldReset) {
    reset()
    shouldReset = false
  }
}
