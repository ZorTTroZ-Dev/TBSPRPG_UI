import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Script} from '../../../../models/script';
import {FormGroup} from '@angular/forms';
import {ScriptService} from '../../../../services/script.service';

@Component({
  selector: 'app-ad-script-edit',
  templateUrl: './ad-script-edit.component.html',
  styleUrls: ['./ad-script-edit.component.scss']
})
export class AdScriptEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() script: Script;
  scriptForm: FormGroup;

  constructor(private scriptService: ScriptService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.script.currentValue) {
      this.scriptForm = this.scriptService.createScriptFormGroup(this.script);
    }
  }

  ngOnDestroy(): void {
  }

  updateScript(): void {

  }
}
