

export function compareValues(key:string, order = 'asc') {
    return function innerSort(a:any, b:any) {

      const workerA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const workerB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (workerA > workerB) {
        comparison = 1;
      } else if (workerA < workerB) {
        comparison = -1;
      }
      return (order === 'desc') ? (comparison * -1) : comparison;
    };
  }