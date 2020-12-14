const MIN_DISTANCE = 30
const VERTEX_RADIUS = 20
const WIDTH_MARGIN = 20
const HEIGHT_MARGIN = 20
let pheromoneWeight = 0.5
let evapororationrate = 0.05

class Graph {

  constructor(vertexCount, antCount) {
    /** ob die ameisen dargestellt werden sollen*/
    this.shouldShowAnts = true
    this.shouldShowBestSolution = true
    /** Ecken des Graphen*/
    this.vertices = []
    /** distancen zwischen den Ecken (this.getDistance()) */
    this.vertexDistances = []
    /** Heuristik zwischen den Ecken bzw. Heuristik der Kanten
    (this.getHeuristic(), this.setHeuristic) */
    this.edgesHeuristics = []
    /** Pheromone auf den Kanten (getPheromone(), setPheromone()) */
    this.edgePheromones = []
    /** Ecke auf der die Ameisen starten */
    this.startingVertex = int(random(0, vertexCount))
    this.ants = []
    /** beste Lösung */
    this.bestSolution = [0, 0]
    /** fjsiafiahgoai hoi*/
    this.shortestDistance = Number.MAX_VALUE
    // hinzüfugen der gewünschten Menge an Ecken
    for (let i = 0; i < vertexCount; i++) {
      this.addNewVertex()
    }
    // vorberechen der Distancen zwischen den Ecken
    for (let i = 0; i < vertexCount; i++) {
      for (let j = 0; j < vertexCount; j++) {
        // prüfen dass nicht zwischen einer und demselben Ecke berechnet wird
        if (i != j) {
          let distance = this.getVertex(i).dist(this.getVertex(j))
          this.setDistance(i, j, distance)
        }
      }
    }
    // vorberechen der Heuristik
    for (let i = 0; i < vertexCount; i++) {
      for (let j = 0; j < vertexCount; j++) {
        // prüfen dass nicht zwischen einer und demselben Ecke berechnet wird
        if (i != j) {
          let heuristic = this.calculateHeuristic(i, j)
          this.setHeuristic(i, j, heuristic)
        }
      }
    }
    // setzen der Pheromone auf 0 (0 ist besser als undefined)
    for (let i = 0; i < vertexCount; i++) {
      for (let j = 0; j < vertexCount; j++) {
        // prüfen dass nicht zwischen einer und demselben Ecke berechnet wird
        if (i != j) {
          let pheromone = 0
          this.setPheromone(i, j, pheromone)
        }
      }
    }
    // hinzüfugen der gewünschten Anzahl an Ameisen
    for (let i = 0; i < antCount; i++) {
      this.ants.push(new Ant(this))
    }
  }

  /** ob zwei Ecken zu nah aneinader sind */
  doVerticesColide(v1, v2) {
    return v1.dist(v2) < MIN_DISTANCE
  }

  /** fügt eine Ecke dem Graphen hinzu, der nicht zu nah an einer anderen
  Ecke im Grapehn ist (Graph#doVerticesColide())*/
  addNewVertex() {
    let newVertex = createVector(random(WIDTH_MARGIN, width - WIDTH_MARGIN),
                                 random(HEIGHT_MARGIN, height - HEIGHT_MARGIN)
    )
    let doesIntersect = false
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.doVerticesColide(newVertex, this.vertices[i])) {
        doesIntersect = true
        break;
      }
    }
    if (doesIntersect) {
      this.addNewVertex()
    } else {
      this.vertices.push(newVertex)
    }
  }

  getStartingVertexIndex() {
    return this.startingVertex
  }

  getVertexCount() {
    return this.vertices.length
  }

  getVertex(index) {
    return this.vertices[index]
  }

  calculateHeuristic(index1, index2) {
    let v1 = this.vertices[index1]
    let v2 = this.vertices[index2]
    return 1 / v1.dist(v2)
  }

  getHeuristic(index1, index2) {
    let max = Math.max(index1, index2)
    let min = Math.min(index1, index2)
    return this.edgesHeuristics[min + max * this.getVertexCount()]
  }

  getPheromone(index1, index2) {
    let max = Math.max(index1, index2)
    let min = Math.min(index1, index2)
    return this.edgePheromones[min + max * this.getVertexCount()]
  }

  getDistance(index1, index2) {
    let max = Math.max(index1, index2)
    let min = Math.min(index1, index2)
    return this.vertexDistances[min + max * this.getVertexCount()]
  }

  setHeuristic(index1, index2, heuristic) {
    let max = Math.max(index1, index2)
    let min = Math.min(index1, index2)
    this.edgesHeuristics[min + max * this.getVertexCount()] = heuristic
  }

  setPheromone(index1, index2, pheromone) {
    let max = Math.max(index1, index2)
    let min = Math.min(index1, index2)
    this.edgePheromones[min + max * this.getVertexCount()] = pheromone
  }

  setDistance(index1, index2, distance) {
    let max = Math.max(index1, index2)
    let min = Math.min(index1, index2)
    this.vertexDistances[min + max * this.getVertexCount()] = distance
  }

  evaporatePheromones() {
    for (let i = 0; i < this.edgePheromones.length; i++) {
      this.edgePheromones[i] = (1.0 - evapororationrate) * this.edgePheromones[i]
    }
  }

  update() {
    strokeWeight(4)
    stroke(0, 0, 0, 2)
    // die Ameisen laufen lassen
    for (let i = 0; i < this.ants.length; i++) {
      this.ants[i].constructSolution();
    }
    // Pheromone von dem Graphen löschen
    this.evaporatePheromones()
    // Pheromone auf den Graph setzen
    for (let i = 0; i < this.ants.length; i++) {
      let solution = this.ants[i].getSolution()
      let distance = this.ants[i].getDistance()
      let score = (1 / distance)
      if (distance < this.shortestDistance) {
        this.bestSolution = solution
        this.shortestDistance = distance
      }
    }
    let score = (1 / this.shortestDistance)
    for (let i = 0; i < this.bestSolution.length; i++) {
      let s0 = this.bestSolution[i - 1]
      let s1 = this.bestSolution[i]
      let prevPherm = this.getPheromone(s0, s1)
      this.setPheromone(s0, s1, prevPherm + score *width* pheromoneWeight)
    }
    fill(255)
    rect(10, 10, width - 20, 10)
    fill(0)
    text(this.shortestDistance, 20, 20)
  }

  /** malt die eine Lösung als Striche die die Ecken des Graphen verbinden*/
  drawSolution(solution) {
    for (let j = 1; j < solution.length; j++) {
      let v1 = this.vertices[solution[j - 1]]
      let v2 = this.vertices[solution[j]]
      line(v1.x, v1.y, v2.x, v2.y)
      rect(v2.x - 5, v2.y - 5, 10, 10)
    }
  }

  drawAnts() {
    strokeWeight(1)
    // die restlichen Lösungen malen
    stroke(0, 0, 0, 20)
    for (let i = 0; i < this.ants.length; i++) {
      let solution = this.ants[i].getSolution()
      this.drawSolution(solution)
    }
  }

  /** malt die beste Lösung der Ameisen als einen Grünen Strich zwischen den
  * Ecken dese Graphen*/
  drawBestSolution() {
    // beste Lösung in grün malen
    stroke(0, 255, 0)
    strokeWeight(1)
    this.drawSolution(this.bestSolution)
  }

  /**malt die Ecken des Graphen als Kreise mit dem Index der jeweiligen Ecke*/
  drawVertices() {
    stroke(0)
    for (let i = 0; i < this.vertices.length; i++) {
      let x = this.vertices[i].x
      let y = this.vertices[i].y
      if (i == this.startingVertex) {
        fill(0, 255, 0)
      } else {
        fill(255, 255, 255)
      }
      strokeWeight(1)
      ellipse(x, y, VERTEX_RADIUS, VERTEX_RADIUS)
      fill(0)
      strokeWeight(0)
      text(i, x - VERTEX_RADIUS/3, y + VERTEX_RADIUS/4)
    }
  }

  /** malt den Graphen mit den Ameisen und der besten Lösung basierent auf den
  * Einstellungen*/
  draw() {
    // Ameisen darstellen
    if (this.shouldShowAnts) {
      this.drawAnts()
    }
    // beste Lösung darstellen
    if (this.shouldShowBestSolution) {
      this.drawBestSolution()
    }
    // Ecken darstellen
    this.drawVertices()
  }

  setShouldShowAnts(should) {
    this.shouldShowAnts = should
  }

  setShouldShowBestSolution(should) {
    this.shouldShowBestSolution = should
  }

}
