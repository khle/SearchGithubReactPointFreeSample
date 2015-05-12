var My = function() {
    var _Maybe = function(val) {
      this.val = val
    }
  
    _Maybe.prototype.map = function(f) {
      return this.val ? Maybe(f(this.val)) : Maybe(this.val)
    }

    var Maybe = function(x) { return new _Maybe(x) }
      
    /*
    var lens = function(x) { return R.lens(
      function get(o) { return o[x] },
      function set(v, o) { var p = Object.create(o); p[x] = v; return p }
    )}*/
    
    //JavaScript Allonge
    function curry(fn) {
      var arity = fn.length
 
      return given([])
 
      function given(argsSoFar) {
        return function helper() {
          var updatedArgsSoFar = argsSoFar.concat(Array.prototype.slice.call(arguments, 0))

          if (updatedArgsSoFar.length >= arity) {
            return fn.apply(this, updatedArgsSoFar)
          }
          else return given(updatedArgsSoFar)
        }
      }
    }
    
    function _lens(get, set) {
      var f = function(obj) { return get(obj) }
      f.get = function(obj) { return get(obj) }
      f.set = curry(set)
      f.map = curry(function(fx, obj) { return set(fx(get(obj)), obj) })
      return f
    }
 
    var lens = function(prop) { return _lens(
      function get(obj) { return obj[prop] },
      function set(val, obj) { var clone = Object.create(obj); clone[prop] = val; return clone }
    )}
                                   
    var _mapLense = function(result, current) {
      result[current] = lens(current)
      return result
    }
    
    //var makeLenses = R.reduce(_mapLense, {})
    var makeLenses = function(ar) { return ar.reduce(_mapLense, {}) }
    
    var fmap = curry(function(f, mappable) { return mappable.map(f) })
    /*
    var fmap = function(f) { 
      return function(mappable) {
        return mappable.map(f)  
      } 
    }*/
    
    return {
      MakeLenses : makeLenses,
      Maybe : Maybe,
      Fmap: fmap
    }
}

module.exports = My