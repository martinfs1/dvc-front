import React from 'react'

const SellerModal = () => {
  return (
    <>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Nueva Venta</button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="">
              <h5 className="modal-title text-center" id="exampleModalLabel">Nueva Venta</h5>
            </div>
            <div className="modal-body">
              <form>
                <fieldset class="form-group">
                  <div className="row">
                    <legend className="col-form-label col-sm-12  pt-0 text-center">Linea de Crédito (obligatorio)</legend>
                    <div className="col-sm-12 d-flex justify-content-around">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                        <label className="form-check-label" for="gridRadios1">
                          Sencillo
                      </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                        <label className="form-check-label" for="gridRadios2">
                          Rapicredito
                      </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="form-group">
                  <div className="row">
                    <legend className="col-form-label col-sm-12 pt-0 text-center">Indique tipo de operación (obligatorio)</legend>
                    <div className="col-sm-12 d-flex justify-content-around">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                        <label className="form-check-label" for="gridRadios1">
                          Crédito
                      </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                        <label className="form-check-label" for="gridRadios2">
                          Electro
                      </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="form-group">
                  <div className="row">
                    <legend className="col-form-label col-sm-12 pt-0 text-center">Cliente Nuevo (obligatorio)</legend>
                    <div className="col-sm-12 d-flex justify-content-around">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                        <label className="form-check-label" for="gridRadios1">
                          Si
                      </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                        <label className="form-check-label" for="gridRadios2">
                          No
                      </label>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label for="inputEmail4">Nombre Cliente (obligatorio)</label>
                    <input type="text" className="form-control" id="inputEmail4" />
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="inputPassword4">DNI Cliente (obligatorio)</label>
                    <input type="number" className="form-control" id="inputPassword4" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label for="inputAddress">Celular del Cliente (obligatorio)</label>
                    <input type="number" className="form-control" id="inputAddress" />
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="inputAddress2">Monto Aprobado (obligatorio)</label>
                    <input type="number" className="form-control" id="inputAddress2" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label for="inputState">Cantidad de Cuotas (obligatorio</label>
                    <select id="inputState" className="form-control">
                      <option selected>elegir...</option>
                      <option>0</option>
                      <option>3</option>
                      <option>6</option>
                      <option>12</option>
                      <option>15</option>
                      <option>18</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="inputZip">Monto por cuota (obligatorio)</label>
                    <input type="number" className="form-control" id="inputZip" />
                  </div>
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">Detalles de la operación</label>
                  <textarea className="form-control" id="message-text"></textarea>
                </div>
                <div className="form-group">
                  <label for="exampleFormControlFile1">Seleccionar Archivo PDF</label>
                  <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerModal;