export class Articulo {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public resumen: string,
    public codigo: string,
    public stock: number,
    public precio: number,
    public imagen: string,
    public categoria: string
  ){}
}
