export const Tab = ({ tabs, setFilter, filter }) => {
    return (
        <div className="w-full flex gap-4 border-b border-slate-200">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => setFilter(tab)}
                    className={`
            px-2 py-2
            text-xs uppercase tracking-widest
            border-b-2
            transition-colors duration-200
            cursor-pointer
            ${filter === tab
                            ? "text-blue-600 border-blue-600"
                            : "text-slate-600 border-transparent hover:text-blue-500"
                        }
          `}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};