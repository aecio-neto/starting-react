import './App.css';
import { useState } from 'react';

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
  }) {
  
  return (
    <form>
      <input 
        type="text"
        value={filterText}
        placeholder="Pesquisar..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
        type="checkbox" 
        checked={inStockOnly}
        onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        {/* Por que há essa string vazia? */}
        Mostre apenas produtos em estoque.
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
      filterText={filterText} 
      inStockOnly={inStockOnly} 
      onFilterTextChange={setFilterText}
      onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
      products={products} 
      filterText={filterText} 
      inStockOnly={inStockOnly} />
    </div>
  );
}

// data
const products = [
  {category: "Frutas", price: "$1", stocked: true, name: "Maçã"},
  {category: "Frutas", price: "$1", stocked: false, name: "Pitaya"},
  {category: "Frutas", price: "$2", stocked: true, name: "Maracujá"},
  {category: "Legumes", price: "$2", stocked: true, name: "Cenoura"},
  {category: "Legumes", price: "$4", stocked: false, name: "Abóbora"},
  {category: "Legumes", price: "$1", stocked: true, name: "Batata"}
];

export default function App() {
  return <FilterableProductTable products={products} />;
}
