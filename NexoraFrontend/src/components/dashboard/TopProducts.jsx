import Card from "../ui/Card";
import HBarList from "../charts/HBarList";

export default function TopProducts({ items }) {
    return (
        <Card title="Top products">
            <HBarList items={items} emptyLabel="No completed orders in this period." />
        </Card>
    );
}