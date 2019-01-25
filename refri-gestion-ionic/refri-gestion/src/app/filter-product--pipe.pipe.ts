import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterProductPipe"
})
export class FilterProductPipePipe implements PipeTransform {
  transform(value: any[], searchText?: string): any {
    if (typeof value !== 'undefined') {
      if(searchText == ""){
        return value;
      }
      else{
        return value.filter((e) => {
          return e["name"].toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        });
      }

    } else {
      return [];
    }
  }
}
