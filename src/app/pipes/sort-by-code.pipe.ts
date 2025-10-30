import { Pipe, PipeTransform } from '@angular/core';
import { BuildingLocationData } from '../models/land.model';

@Pipe({
  name: 'sortByCode',
  standalone: true,
  pure: false
})
export class SortByCodePipe implements PipeTransform {
  transform(items: BuildingLocationData[] | null): BuildingLocationData[] {
    if (!items || items.length === 0) {
      return items || [];
    }

    return [...items].sort((a, b) => {
      // Convert codes to numbers for proper numeric sorting
      const codeA = parseInt(a.code, 10);
      const codeB = parseInt(b.code, 10);
      return codeA - codeB;
    });
  }
}
