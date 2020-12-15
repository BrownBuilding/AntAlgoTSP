class GraphRenderer {

  constructor(graph) {
    setGraph(graph)
  }

  setGraph(graph) {
    this.mainGraph = graph
    this.shouldDrawSolutions = false
    this.shouldDrawBestSolution = false
  }

  drawSolutions() {

  }

  drawBestSolution() {

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

  }
}
