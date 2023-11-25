export default class Slider {
  constructor(value, isLearning, storageKey) {
    this.value = value
    this.isLearning = isLearning
    this.storageKey = storageKey
    // i want to remember MIDI learns,
    // so this pulls from storage to get a default value
    this.cc = parseInt(window.localStorage.getItem(storageKey), 10) || null
  }
}
