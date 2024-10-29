const Dropdown = ({ title, options, func }) => {
    return (
        <div className="relative w-full sm:w-auto">
            <select
                onChange={func}
                defaultValue="0"
                name="format"
                className="bg-[#1F1E24] text-zinc-400 border border-zinc-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#6556cd] transition duration-200"
            >
                <option value="0" disabled>
                    {title}
                </option>
                {options.map((o, i) => (
                    <option key={i} value={o}>
                        {o.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
