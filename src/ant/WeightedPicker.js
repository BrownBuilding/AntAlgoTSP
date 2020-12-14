class WeightedPicker {

  constructor() {
    this.probabilities = []
    this.elements = []
  }

  addProbability(element, probability) {
    this.probabilities.push(probability)
    this.elements.push(element)
  }

  /** gibt ein zufälliges Elemt aus. die Wahrscheinlichkeit, dass das Element
  * ausgegeben wird hängt von der Wahrscheinlichkeit ab, die dem Element
  * durch das hinzufügen durch WeightedPicker#addProbability() zugeordnet
  * wurde */
  pick() {
    // Bestimmen der Summe aller Wahrscheinlichkeiten
    let probSum = 0
    for (let i = 0; i < this.probabilities.length; i++) {
      probSum += this.probabilities[i]
    }
    // auswählen des Elementes
    let randomNumber = random(0, probSum)
    let prevSum = 0
    for (let i = 0; i < this.probabilities.length; i++) {
      prevSum += this.probabilities[i]
      if (randomNumber <= prevSum) {
        return this.elements[i]
      }
    }
    return this.elements[this.elements.length - 1]
  }

}
