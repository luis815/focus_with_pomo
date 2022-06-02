import React, { useState } from "react";

export default ({ heading, list, setList }) => {
	const [newItem, setNewItem] = useState("");

	const handleNewItem = () => {
		if (newItem.length !== 0) {
			setList([...list, newItem]);
			setNewItem("");
		}
	};

	const handleDeleteItem = (index) => {
		const tempList = [...list];
		tempList.splice(index, 1);
		setList(tempList);
	};

	return (
		<div className="reminders">
			<h2>{heading}</h2>
			<div className="list">
				{list.map((item, index) => (
					<div className="item-container" key={index}>
						<input
							type="text"
							autoCapitalize="true"
							autoComplete="true"
							autoCorrect="true"
							value={item}
							disabled
						/>
						<button type="button" onClick={() => handleDeleteItem(index)} />
					</div>
				))}
				<div className="item-container">
					<input
						type="text"
						autoCapitalize="true"
						autoComplete="true"
						autoCorrect="true"
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
						onKeyDown={(e) => (e.key === "Enter" ? handleNewItem() : null)}
					/>
					<button className="new" type="button" onClick={handleNewItem} />
				</div>
			</div>
		</div>
	);
};
