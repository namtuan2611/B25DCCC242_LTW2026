import React from 'react';
const StudentItem=({student ,onDeleteStudent}) =>{
    const { id,name,score,className} = student;
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{score}</td>
            <td>{className}</td>
            <td><button 
          onClick={() => onDeleteStudent(id)}
          style={{ backgroundColor: '#ff4d4f', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
        >
          Xóa
        </button></td>
        </tr>
    );
};
export default StudentItem;