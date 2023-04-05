// Thay thế cho lớp đối tượng DanhSach

function ProductServices () {
    // lấy danh sách SP
    this.getProductList = function () {
        // GET, https://640808668ee73db92e36c7c4.mockapi.io/Products

        // Promise: 3 trạng thái (pending, resolve, reject)
        // Pending
        return axios({
            method: 'get',
            url: 'https://640808668ee73db92e36c7c4.mockapi.io/Products'
          })
          
    }

    // thêm sản phẩm
    this.addProductSer = function (product) {
        return axios({
            method: 'post',
            url: 'https://640808668ee73db92e36c7c4.mockapi.io/Products',
            data: product
          })
    }

    // xóa sản phẩm
    this.deleteProductSer = function (id) {
        return axios({
            method: 'delete',
            url: `https://640808668ee73db92e36c7c4.mockapi.io/Products/${id}`,
          })
    }

    // hiển thị sản phẩm
    this.getProductSer = function (id) {
    return axios({
        method: 'get',
        url: `https://640808668ee73db92e36c7c4.mockapi.io/Products/${id}`,
        })
    }

    this.updateProductSer = function (productUpdate,id) {
        return axios({
            method: 'put',
            url: `https://640808668ee73db92e36c7c4.mockapi.io/Products/${id}`,
            data: productUpdate
          })
    }


}