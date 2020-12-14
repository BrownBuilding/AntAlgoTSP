
class Ant {

  constructor(graphs) {
    this.graph = graphs
    this.solution = []
  }

  constructSolution() {
    this.solution = [] // Lösung zurücksetzen
    // Startecke der Lösung hinzufügen
    this.solution.push(this.graph.getStartingVertexIndex())
    // restliche Ecken hinzufügen
    for (let i = 1; i < this.graph.getVertexCount(); i++) {
      let lastVertex = this.solution[i - 1]
      let picker = new WeightedPicker()
      for (let j = 0; j < this.graph.getVertexCount() ; j++) {
        if (!this.solution.includes(j)) {
          let heuristic = this.graph.getHeuristic(lastVertex, j)
          let pheromone = this.graph.getPheromone(lastVertex, j)
          let probability = heuristic + pheromone
          picker.addProbability(j, probability)
        }
      }
      let pick = picker.pick()
      this.solution.push(pick)
    }
  }

  /** gibt die Lösung als ein Array von Indices der Ecken des Graphen */
  getSolution() {
    return this.solution
  }

  getDistance() {
    let distance = 0
    let solution = this.getSolution()
    // berechne die Summe aller Distanzen zwischen den Ecken der Lösung
    for (let i = 1; i < solution.length; i++) {
      // addieren der Distance zwischen der Ecke bei i - 1 und i mit der Summe
      distance += this.graph.getDistance(solution[i-1], solution[i])
    }
    return distance
  }

}
