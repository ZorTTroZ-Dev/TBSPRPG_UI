import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Script, SCRIPT_TYPES} from '../../../../models/script';
import {FormGroup} from '@angular/forms';
import {ScriptService} from '../../../../services/script.service';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-ad-script-edit',
  templateUrl: './ad-script-edit.component.html',
  styleUrls: ['./ad-script-edit.component.scss']
})
export class AdScriptEditComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() script: Script;
  @Input() scripts: Script[];
  scriptForm: FormGroup;
  scriptTypes: string[] = SCRIPT_TYPES;

  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  aceEditor: ace.Ace.Editor;

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

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '16px');
    ace.config.set('basePath', 'https://ace.c9.io/build/src-noconflict/');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.renderer.attachToShadowRoot();
    this.aceEditor.session.setValue(this.scriptForm.get('content').value);
    this.aceEditor.setTheme('ace/theme/monokai');
    this.aceEditor.session.setMode('ace/mode/lua');
    this.aceEditor.session.setTabSize(4);
    this.aceEditor.session.setUseSoftTabs(true);
  }

  updateScript(): void {
    this.scriptForm.patchValue({
      content: this.aceEditor.getValue()
    });
    console.log(this.scriptForm.value);
  }
}
