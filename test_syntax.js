
const admCurrentCat = 'test';
const database = { test: [{ name: 'P1', price: 10, isMix: false }, { name: 'P2', price: 20, isMix: true }] };

function renderAdmTable() {
    const tableBody = { innerHTML: '' };
    const items = database[admCurrentCat] || [];

    tableBody.innerHTML = items.map((p, index) => `
    <tr>
        <td><img src="${p.img || 'https://via.placeholder.com/50'}" style="width:40px; height:40px; object-fit:cover; border-radius:5px;"></td>
        <td>${p.isMix ? p.title : p.name}</td>
        <td>
            ${p.isMix ? '---' : `<input type="number" value="${p.price}" 
                    style="width:70px; padding:3px; border:1px solid #ddd; border-radius:5px;"
                    onchange="admUpdateCurrentPrice('${admCurrentCat}', ${index}, this.value)"> ج`}
        </td>
    </tr>
`).join('');
}
renderAdmTable();
console.log("Success");
