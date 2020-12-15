class GraphRenderer {

  constructor(graph) {
    this.setGraph(graph)
  }

  setGraph(graph) {
    this.mainGraph = graph
    this.shouldDrawSolutions = false
    this.shouldDrawBestSolution = false
  }

  setShouldDrawSolutions(should) {
    this.shouldDrawSolutions = should
  }

  setShouldDrawBestSolution(should) {
    this.shouldDrawBestSolution = should
  }

  drawSolution(solution) {
    for (let j = 1; j < solution.length; j++) {
      let v1 = mainGraph.getVertex(solution[j - 1])
      let v2 = mainGraph.getVertex(solution[j])
      line(v1.x, v1.y, v2.x, v2.y)
      rect(v2.x - 5, v2.y - 5, 10, 10)
    }
  }

  drawSolutions() {
    strokeWeight(1)
    stroke(0, 0, 0, 20)
    for (let i = 0; i < mainGraph.ants.length; i++) {
      let solution = mainGraph.ants[i].getSolution()
      this.drawSolution(solution)
    }
  }

  drawBestSolution() {
    stroke(0, 255, 0)
    strokeWeight(1)
    this.drawSolution(mainGraph.bestSolution)
  }

  drawVertex(number, vector, color) {
    fill(color[0], color[1], color[2])
    stroke(0)
    strokeWeight(1)
    ellipse(vector.x, vector.y, VERTEX_RADIUS, VERTEX_RADIUS)
    fill(0)
    strokeWeight(0)
    text(number, vector.x - VERTEX_RADIUS/3, vector.y + VERTEX_RADIUS/4)
  }

  drawVertices() {
    for (let i = 0; i < mainGraph.getVertexCount(); i++) {
      let vColor = [255, 255, 255]
      if (i == mainGraph.getStartingVertexIndex())
        vColor = [0, 255, 0]
      this.drawVertex(i, mainGraph.getVertex(i), vColor)
    }
  }

  draw() {
    if (this.shouldDrawSolutions)
      this.drawSolutions()
    if (this.shouldDrawBestSolution)
      this.drawBestSolution()
    this.drawVertices()
  }

}
