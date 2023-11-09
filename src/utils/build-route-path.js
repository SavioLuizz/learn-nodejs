
export function buildRoutePath(path){
    const routeParemetersRegex = /:([a-zA-z]+)/g

    console.log(Array.from(path.matchAll((routeParemetersRegex))))
}