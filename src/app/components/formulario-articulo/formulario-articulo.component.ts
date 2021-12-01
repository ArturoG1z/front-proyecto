import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { NgForm } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { environment as env } from 'src/environments/environment';
import { Articulo } from 'src/app/models/articulo.model';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"

@Component({
  selector: 'app-formulario-articulo',
  templateUrl: './formulario-articulo.component.html',
  styleUrls: ['./formulario-articulo.component.scss'],
  providers: [ArticuloService, UploadService],
})
export class FormularioArticuloComponent implements OnInit {
  public titulo: string;
  public crear: boolean;
  public articulo: Articulo;
  public status: string;
  public filesToUpload: Array<File>;
  public save_articulo: Articulo;
  public update_articulo: Articulo;
  public url: string;
  constructor(
    private _articuloService: ArticuloService,
    private _uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.titulo = 'Registrar articulo';
    this.crear = true;
    this.articulo = new Articulo('', '', '', '', '', 0, 0, '', '');
    this.save_articulo = new Articulo('', '', '', '', '', 0, 0, '', '');
    this.update_articulo = new Articulo('', '', '', '', '', 0, 0, '', '');
    this.status = 'inactive';
    this.filesToUpload = [];
    this.url = env.API_URL;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idArticulo = routeParams.get('id');
    if (idArticulo) {
      this.titulo = 'Editar articulo';
      this.crear = false;
      this._articuloService.getArticulo(idArticulo).subscribe(
        (response: any) => {
          this.articulo = response.articulo;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.titulo = 'Registrar articulo';
      this.crear = true;
    }
  }

  onSubmit(form: NgForm) {
    this.disableForm(form);
    //validates not empty fields nombre descripcion resumen codigo stock precio categoria
    if (
      this.articulo.nombre != '' &&
      this.articulo.descripcion != '' &&
      this.articulo.resumen != '' &&
      this.articulo.codigo != '' &&
      this.articulo.stock != 0 &&
      this.articulo.precio != 0 &&
      this.articulo.categoria != ''
    ) {
      if(this.articulo._id != ''){
        this._articuloService.updateArticulo(this.articulo).subscribe(
          response => {
            this.onSubmitResponse(response, form);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this._articuloService.saveArticulo(this.articulo).subscribe(
          response => this.onSubmitResponse(response, form),
          (error) => {
            console.log(error);
            this.enableForm(form);
            this.status = 'error';
          }
        );
      }
    } else {
      this.enableForm(form);
      this.status = 'error';
    }
    this.router.navigate(['/articulos'])
  }

  onSubmitResponse(response: any, form: NgForm) {
    if (response.articulo) {
      if (this.filesToUpload.length > 0) {
        this._uploadService
          .makeFileRequest(
            this.url + 'articulos/image/' + response.articulo._id,
            [],
            this.filesToUpload,
            'imagen'
          )
          .then((result: any) => {
            this.save_articulo = result.articulo;

            this.status = 'success';
            form.reset();
          });
      } else {
        this.save_articulo = response.articulo;
        this.status = 'success';
        form.reset();
      }
    } else {
      this.status = 'error';
    }
    this.status = 'success';
    this.articulo = new Articulo('', '', '', '', '', 0, 0, '', '');
    this.enableForm(form);
    form.reset();
  }

  fileChangeEvent(fileInput: Event) {
    const element = fileInput.target as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.filesToUpload = Array.from(fileList);
    }
  }

  disableForm(form: NgForm) {
    form.form.disable();
  }

  enableForm(form: NgForm) {
    form.form.enable();
  }
}
