class WeightedPicker {

  constructor() {
    this.probabilities = []
    this.elements = []
  }

  addProbability(element, probability) {
    this.probabilities.push(probability)
    this.elements.push(element)
  }

  /** returns a random element, which was added using `addProbability()`
  * with the specified probability of that element */
  pick() {
    // determine the sum of all probabilities
    let probSum = 0
    for (let i = 0; i < this.probabilities.length; i++) {
      probSum += this.probabilities[i]
    }
    // pick the element
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
