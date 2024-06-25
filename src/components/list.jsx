import { Input } from "./input";

function List({ list }) {
    return (
        <div className="flex flex-col gap-2 h-[400px] overflow-auto">
            {list &&
                list.length &&
                list.map((item) => (
                    <div className="flex gap-2">
                        <input type="checkbox" />
                        <Input value={item.value} onKeyDown={(e) => e.key == "Enter" && e.target.blur()} />
                    </div>
                ))}
        </div>
    );
}

export default List;
