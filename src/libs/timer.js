export default function timer() {
  this._timer = null
  this._startTime = null
  this._time = 0
}

timer.prototype.valueOf = function () {
  return this._time
}

timer.prototype.start = function () {
  this._startTime = new Date()
  this._timer = setInterval(() => {
    this._time = new Date().valueOf() - this._startTime.valueOf()
  })
}

timer.prototype.end = function () {
  clearInterval(this._timer)
  this._time = new Date().valueOf() - this._startTime.valueOf()
}
