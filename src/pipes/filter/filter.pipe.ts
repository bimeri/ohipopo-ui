import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, searchText?: any): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter((data) => this.matchValue(data, searchText));
  }

  matchValue(data, searchText) {
    return Object.keys(data).map((key) => {
      return new RegExp(searchText, 'gi').test(data[key]);
    }).some(result => {
          return result === true;
      });
  }

}
