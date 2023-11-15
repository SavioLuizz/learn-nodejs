
export function buildRoutePath(path){
    const routeParemetersRegex = /:([a-zA-z]+)/g
    const pathWithParams = path.replaceAll(routeParemetersRegex, '(?<$1>[a-z0-9\-_]+)')
    //console.log(pathWithParams)

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex;
}