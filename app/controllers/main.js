const productSer = new ProductServices ();


function showTable (arrayData) {
    var content = '';

    arrayData.map(function(product,index) {
        content += 
        `<tr>
            <td></td>
            <td>${product.tenSP}</td>
            <td>${product.gia.toLocaleString()}</td>
            <td>${product.hinhAnh}</td>
            <td>${product.moTa}</td>
            <td>
                <button onclick='deleteProduct("${product.id}")' class='btn btn-danger'>Xóa</button>
                <button data-toggle="modal" data-target="#myModal" onclick='showProductDetail("${product.id}")' class='btn btn-info'>Xem</button>
            </td>
        </tr>`
    })
    document.getElementById('tblDanhSachSP').innerHTML = content;
}

function showProductList () {
    // hiển thị ds khi thành công, ngược lại báo lỗi khi thất bại
    var axiosResult = productSer.getProductList();
    axiosResult
    .then(function(result) {
        // Resolve (thành công)
        // console.log(result)
        console.log(result.data)

        // các xử lý sau khi có data
        showTable(result.data);
      })
    .catch(function(error) {
        // Reject (thất bại)
        console.log(error)
      })
}
//lấy ds khi load web
showProductList()


function addProduct () {
    // lấy dữ liệu từ form
    var tenSP = document.getElementById('TenSP').value;
    var gia = document.getElementById('GiaSP').value;
    var hinhAnh = document.getElementById('HinhSP').value;
    var moTa = document.getElementById('MoTa').value;

    // tạo đối tượng sản phẩm
    var product = new Product (tenSP,gia,hinhAnh,moTa);
    console.log(product);

    // truyền xuống BE
    productSer.addProductSer(product)
    .then(function(result){
        // console.log(result);
        showProductList();
    })
    .catch(function(error){
        console.log(error)
    })

    // hiển thị danh sách sản phẩm
}

document.getElementById('btnThemSP').onclick = function () {
    // them button cho form
    document.querySelector('#myModal .modal-footer').innerHTML = 
    `<button class='btn btn-success' onclick='addProduct()'>Add Product</button>`

    document.getElementById('formProduct').reset();
}

function deleteProduct(id) {
    console.log(id);
    productSer.deleteProductSer(id)
    .then(function(result) {
        console.log(result)

        // hiển thị lại danh sách
        showProductList();
    })
    .catch(function(error) {
        console.log(error)
    })
}

function showProductDetail (id) {
    console.log(id);
    productSer.getProductSer(id)
    .then(function(result) {
        console.log(result.data);

        // hiển thị lên form
        document.getElementById('TenSP').value = result.data.tenSP;
        document.getElementById('GiaSP').value = result.data.gia;
        document.getElementById('HinhSP').value = result.data.hinhAnh;
        document.getElementById('MoTa').value = result.data.moTa;
    
        document.querySelector('#myModal .modal-footer').innerHTML = 
        `<button class='btn btn-success' onclick='updateProduct("${result.data.id}")'>Update Product</button>`
    
    })
    .catch(function(error) {
        console.log(error)
    })
}

function updateProduct (id) {
    console.log(id);

    var tenSP = document.getElementById('TenSP').value;
    var gia = document.getElementById('GiaSP').value;
    var hinhAnh = document.getElementById('HinhSP').value;
    var moTa = document.getElementById('MoTa').value;

    var updateProduct = new Product (tenSP,gia,hinhAnh,moTa);
    console.log(updateProduct);

    productSer.updateProductSer(updateProduct,id)
    .then (function(result) {
        console.log(result.data);
        showProductList();

        alert('Cập nhật thành công');
        document.querySelector("#myModal .close").click();
    })
    .then (function(error) {
        console.log(error)
    })

}



