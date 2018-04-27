import React from 'react'
function Table(props){
	return(
		<table className="table">
			<thead className="thead-dark">
				<tr>
					<th scope="col">书籍编号</th>
					<th scope="col">分类</th>
					<th scope="col">书籍名称</th>
					<th scope="col">出版社</th>
					<th scope="col">年份</th>
					<th scope="col">作者</th>
					<th scope="col">价格</th>
					<th scope="col">库存</th>
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