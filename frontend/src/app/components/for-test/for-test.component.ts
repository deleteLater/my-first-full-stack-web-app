import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../services/role.service';

@Component({
  selector: 'app-for-test',
  templateUrl: './for-test.component.html',
  styleUrls: ['./for-test.component.scss']
})
export class ForTestComponent implements OnInit {

  constructor(
    private role: RoleService
  ) {
  }

  ngOnInit(): void {
    this.role.getAll();
  }

}
