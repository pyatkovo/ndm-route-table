import {Component} from '@angular/core';
import {RouteType} from '../../types/route.type';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-table.component.html',
  styleUrl: './route-table.component.scss'
})


export class RouteTableComponent {
  sortState: {
    field: 'address' | 'gateway' | 'interface' | null;
    direction: 'asc' | 'desc' | null;
  } = {field: null, direction: null};
  routes: RouteType[] = [
    {
      uuid: '1',
      address: '192.168.1.1/24',
      mask: '255.255.255.0',
      gateway: '192.168.0.254',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '2',
      address: '10.0.0.1/24',
      mask: '255.255.255.0',
      gateway: '10.0.0.254',
      interface: 'Резервный Ethernet',
    },
    {
      uuid: '3',
      address: '172.16.0.1/16',
      mask: '255.255.0.0',
      gateway: '172.16.0.254',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '4',
      address: '192.168.0.10/24',
      mask: '255.255.255.0',
      gateway: '192.168.0.1',
      interface: 'Домашняя сеть',
    },
    {
      uuid: '5',
      address: '8.8.8.8/32',
      mask: '255.255.255.255',
      gateway: '192.168.1.254',
      interface: 'VPN-подключение',
    },
    {
      uuid: '6',
      address: '10.0.1.1/24',
      mask: '255.255.255.0',
      gateway: '10.0.0.254',
      interface: 'Ethernet №2',
    },
    {
      uuid: '7',
      address: '172.16.1.1/16',
      mask: '255.255.0.0',
      gateway: '172.16.0.254',
      interface: 'Гостевая сеть',
    },
    {
      uuid: '8',
      address: '127.0.0.1/8',
      mask: '255.0.0.0',
      gateway: '0.0.0.0',
      interface: 'Локальный интерфейс',
    },
  ];

  originalRoutes: RouteType[] = [...this.routes];

//Сортировка определенных полей address | gateway | interface
  sortBy(field: 'address' | 'gateway' | 'interface'): void {
    if (this.sortState.field !== field) {
      this.sortState = { field, direction: 'asc' };
    } else {
      if(this.sortState.direction === 'asc'){
        this.sortState.direction = 'desc'
      } else if(this.sortState.direction === 'desc'){
        this.sortState.direction = null;
      } else {
        this.sortState.direction = 'asc';
      }
    }

    if(this.sortState.direction === null){
      this.routes = [...this.originalRoutes];
    } else{
      this.routes.sort((a, b) => {
        let result: number;

        if (field === 'address' || field === 'gateway') {
          result = compareIps(a[field], b[field]);
        } else if (field === 'interface') {
          result = a.interface.localeCompare(b.interface);
        } else {
          result = 0;
        }
        return this.sortState.direction === 'asc' ? result : -result;
      });
    }
  }


}

//проводим сравнение IPv4 по октетам
function compareIps(a: string, b: string): number {
  const aParts = extractIp(a).split('.').map(Number);
  const bParts = extractIp(b).split('.').map(Number);

  for (let i = 0; i < 4; i++) {
    if (aParts[i] !== bParts[i]) {
      return aParts[i] - bParts[i];
    }
  }
  return 0;
}

//исключаем CIDR из IP
function extractIp(cidr: string): string {
  return cidr.split('/')[0];
}
