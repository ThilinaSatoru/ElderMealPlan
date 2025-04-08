import React, {useState} from "react";

interface FilterableStringListProps {
    items: string[];
    selectedItems: string[];
    onItemSelect: (selected: string[]) => void;
    placeholder: string;
    emptyMessage: string;
    multiSelect: boolean;
}

export default function FilterableStringList({
                                                 items,
                                                 selectedItems,
                                                 onItemSelect,
                                                 placeholder,
                                                 emptyMessage,
                                                 multiSelect,
                                             }: FilterableStringListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (item: string) => {
        if (multiSelect) {
            const newSelected = selectedItems.includes(item)
                ? selectedItems.filter(i => i !== item)
                : [...selectedItems, item];
            onItemSelect(newSelected);
        } else {
            onItemSelect([item]);
        }
    };

    return (
        <div className="relative">
            {/*<Input*/}
            {/*    type="text"*/}
            {/*    placeholder={placeholder}*/}
            {/*    value={searchTerm}*/}
            {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*    className="mb-2"*/}
            {/*/>*/}
            <div className="max-h-60 overflow-y-auto border rounded-md">
                {filteredItems.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">{emptyMessage}</div>
                ) : (
                    <div className="divide-y">
                        {filteredItems.map((item) => (
                            <div
                                key={item}
                                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                    selectedItems.includes(item) ? "bg-blue-50" : ""
                                }`}
                                onClick={() => handleSelect(item)}
                            >
                                <div className="flex items-center">
                                    {multiSelect ? (
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item)}
                                            readOnly
                                            className="mr-2"
                                        />
                                    ) : (
                                        <input
                                            type="radio"
                                            checked={selectedItems.includes(item)}
                                            readOnly
                                            className="mr-2"
                                        />
                                    )}
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedItems.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedItems.map((item) => (
                        <span
                            key={item}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                            {item}
                            <button
                                type="button"
                                className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
                                onClick={() => handleSelect(item)}
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}