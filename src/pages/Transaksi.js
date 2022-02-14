import React from "react"
import axios from "axios"

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: []
        }
    }

    getData() {
        let endpoint = "http://localhost:8001/api/transaksi"
        axios.get(endpoint)
            .then(response => {
                this.setState({ transaksi: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()
    }

    convertStatus(status){
        if (status === 1) {
            return (
                <div className="badge bg-info">
                    Transaksi Baru
                </div>
            )
        } else if(status ===2) {
            return (
                <div className="badge bg-warning">
                    Sedang diproses
                </div>
            )
        } else if(status === 3) {
            return (
                <div className="badge bg-secondary">
                    Siap diambil
                </div>
            )
        } else if(status === 4) {
            return (
                <div className="badge bg-success">
                    Sudah diambil
                </div>
            )
        }
        if(!localStorage.getItem("token")){
            window.location.href ="/login"
        }
    }
    render() {
        return (
            <div className="card">
               
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.transaksi.map(trans => (
                            <li className="list-group-item">
                                <div className="row">
                                    {/* this is member area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Member
                                        </small> <br />
                                        {trans.member.nama}
                                    </div>
                                    {/* this is Tgl Trans area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tgl Transaksi
                                        </small> <br />
                                        {trans.tgl}
                                    </div>
                                    {/* this is Batas Waktu area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Batas Waktu
                                        </small> <br />
                                        {trans.batas_waktu}
                                    </div>
                                    {/* this is Tgl Bayar area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tanggal Bayar
                                        </small> <br />
                                        {trans.tgl_bayar}
                                    </div>
                                    {/* this is status area */}
                                    <div className="col-lg-5">
                                        <small className="text-info">
                                            Status
                                        </small> <br />
                                        {this.convertStatus(trans.status)}
                                    </div>
                                </div>

                                {/* area detail transaksi */}
                                <hr />
                                <h5>Detail Transaksi</h5>
                                {trans.detail_transaksi.map(detail => ( 
                                    <div className="row">
                                        {/* area nama paket */}
                                        <div className="col-lg-3">
                                            {detail.paket.jenis_paket}
                                        </div>
                                        {/* area qty */}
                                        <div className="col-lg-2">
                                            Qty: {detail.qty}
                                        </div>
                                        {/* area harga paket */}
                                        <div className="col-lg-3">
                                            @ Rp {detail.paket.harga}
                                        </div>
                                        {/* area harga total */}
                                        <div className="col-lg-4">
                                            Rp {detail.paket.harga * detail.qty}
                                        </div>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}