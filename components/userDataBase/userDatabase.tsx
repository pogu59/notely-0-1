"use client";

import React, { useState, useEffect } from "react";

// 회원 데이터 타입 정의
type User = {
  id: number;
  email: string;
  name: string;
  password: string;
}

export default function LocalDBPractice() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // 1. 초기 로딩: 브라우저 저장소에서 데이터 불러오기
  useEffect(() => {
    const savedUsers = localStorage.getItem("practice-users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // 2. 데이터 변경될 때마다 LocalStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem("practice-users", JSON.stringify(users));
  }, [users]);

  // 생성 (Create)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // 수정 모드 (Update)
      setUsers(users.map(u => u.id === editingId ? { ...u, email, name, password } : u));
      setEditingId(null);
    } else {
      // 생성 모드 (Create)
      const newUser = {
        id: Date.now(),
        email,
        name,
        password
      };
      setUsers([...users, newUser]);
    }

    // 입력창 초기화
    setEmail("");
    setName("");
    setPassword("");
  };

  // 수정 준비
  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEmail(user.email);
    setName(user.name);
    setPassword(user.password);
  };

  // 삭제 (Delete)
  const deleteUser = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">회원 관리 실습 (Local Storage)</h1>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-8 shadow-sm">
        <div className="grid gap-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <button 
            type="submit" 
            className={`p-2 text-white rounded font-bold ${editingId ? 'bg-orange-500' : 'bg-blue-600'}`}
          >
            {editingId ? "회원 정보 수정" : "회원 등록"}
          </button>
        </div>
      </form>

      {/* 목록 출력 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">등록된 회원 목록 ({users.length}명)</h2>
        {users.length === 0 && <p className="text-gray-500">등록된 회원이 없습니다.</p>}
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded-md flex justify-between items-center bg-white shadow-sm">
            <div>
              <p className="font-bold">{user.name} ({user.email})</p>
              <p className="text-sm text-gray-500">PW: {user.password}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(user)} className="text-sm bg-gray-200 px-3 py-1 rounded">수정</button>
              <button onClick={() => deleteUser(user.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}