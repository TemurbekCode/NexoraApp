import { memo } from "react";

function ProductBars({ products }) {
    return (
        <div className="products">
            <p className="products__label">Top products</p>
            <ul className="products__list">
                {products.map((p, i) => (
                    <li key={p.name} className="product">
                        <div className="product__row">
                            <span>{p.name}</span>
                            <span className="product__value">{p.value}</span>
                        </div>
                        <div className="product__track" aria-hidden="true">
                            <div
                                className="product__bar"
                                style={{ "--share": p.share / 100, "--i": i }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default memo(ProductBars);