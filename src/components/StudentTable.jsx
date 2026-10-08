import React from 'react';
import StudentItem from './StudentItem';

const StudentTable = ({ students = [], onDeleteStudent }) => {
  return (
    <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Điểm số</th>
          <th>Lớp</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <StudentItem 
              key={student.id} 
              student={student} 
              onDeleteStudent={onDeleteStudent} 
            />
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>Không có sinh viên nào.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;