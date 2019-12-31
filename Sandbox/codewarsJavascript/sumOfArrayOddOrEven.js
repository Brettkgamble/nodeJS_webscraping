console.log(
    Math.abs(([0, 1, -4].reduce((a,b)=> a+b,0)) % 2) == 1 ? 'odd' : 'even'
)