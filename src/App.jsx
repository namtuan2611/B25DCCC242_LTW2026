import React, { useState } from 'react';
import StudentTable from './components/StudentTable';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn A', score: 8.5, className: 'D20CQCN01' },
  { id: 2, name: 'Trần Thị B', score: 4.0, className: 'D20CQCN02' },
  { id: 3, name: 'Lê Văn C', score: 9.0, className: 'D20CQCN01' },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [className, setClassName] = useState('');
  const [filter, setFilter] = useState('ALL'); // 'ALL', 'GIOI', 'TRUOT'
  const [error, setError] = useState('');

  // Xử lý thêm sinh viên mới
  const handleAddStudent = (e) => {
  e.preventDefault();

  if (!name.trim() || !score.toString().trim() || !className.trim()) {
    setError('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  const numScore = parseFloat(score);
  if (isNaN(numScore) || numScore < 0 || numScore > 10) {
    setError('Điểm số không hợp lệ! (phải từ 0 đến 10)');
    return;
  }

  // Tự động tìm ID lớn nhất hiện tại rồi cộng thêm 1
  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    score: numScore,
    className: className.trim(),
  };

  setStudents([...students, newStudent]);
  setName('');
  setScore('');
  setClassName('');
  setError('');
};

  // Xử lý xóa sinh viên
  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  // Lọc danh sách sinh viên theo bộ lọc
  const filteredStudents = students.filter((student) => {
    if (filter === 'GIOI') return student.score >= 8;
    if (filter === 'TRUOT') return student.score < 5;
    return true;
  });

  // Thống kê cơ bản bằng phương thức reduce của ES6
  const totalStudents = students.length;
  const averageScore = totalStudents > 0 
    ? (students.reduce((acc, curr) => acc + curr.score, 0) / totalStudents).toFixed(2)
    : 0;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center' }}>Ứng dụng "Quản lý Điểm Sinh viên"</h2>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleAddStudent} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Thêm sinh viên mới</h3>
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Họ tên" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ padding: '8px', flex: '1' }}
          />
          <input 
            type="number" 
            step="0.1" 
            placeholder="Điểm số (0 - 10)" 
            value={score} 
            onChange={(e) => setScore(e.target.value)} 
            style={{ padding: '8px', width: '120px' }}
          />
          <input 
            type="text" 
            placeholder="Lớp" 
            value={className} 
            onChange={(e) => setClassName(e.target.value)} 
            style={{ padding: '8px', width: '120px' }}
          />
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Thêm
          </button>
        </div>
      </form>

      {/* Bộ lọc và Thống kê */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
  <span><strong>Bộ lọc: </strong></span>
  <button onClick={() => setFilter('ALL')} style={{ marginRight: '5px', fontWeight: filter === 'ALL' ? 'bold' : 'normal' }}>Tất cả</button>
  <button onClick={() => setFilter('GIOI')} style={{ marginRight: '5px', fontWeight: filter === 'GIOI' ? 'bold' : 'normal' }}>Giỏi (&gt;= 8)</button>
  <button onClick={() => setFilter('TRUOT')} style={{ fontWeight: filter === 'TRUOT' ? 'bold' : 'normal' }}>Trượt (&lt; 5)</button>
</div>
        <div>
          <p style={{ margin: 0 }}>
            {`Tổng số sinh viên: ${totalStudents} | Điểm trung bình: ${averageScore}`}
          </p>
        </div>
      </div>

      {/* Bảng danh sách sinh viên */}
      <StudentTable students={filteredStudents} onDeleteStudent={handleDeleteStudent} />
    </div>
  );
};

export default App;