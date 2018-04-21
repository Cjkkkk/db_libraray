import React from 'react'
function Table(props){
	return(
		<table className="table">
			<thead className="thead-dark">
				<tr>
					<th scope="col">book no</th>
					<th scope="col">category</th>
					<th scope="col">book_name</th>
					<th scope="col">press</th>
					<th scope="col">year</th>
					<th scope="col">author</th>
					<th scope="col">price</th>
					<th scope="col">stock</th>
				</tr>
			</thead>
		<tbody>{props.data.map((message) => <Tr key={message.book_no} tr={message} />)}</tbody>
		</table>
	)
}


function Tr(props){
	var tr = []
	for(var field in props.tr){
		tr.push(props.tr[field])
	}
	return(<tr scope="row">{tr.map((content,index) => <td key={index}>{content} </td>)}</tr>)
}

export default Table