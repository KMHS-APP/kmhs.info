import React, { useState } from "react";

type Desk = {
  id: string;
  isActive: boolean;
  assignedNumber?: number; // 할당된 번호
};

const SchoolSeatSelector: React.FC = () => {
  const [rows, setRows] = useState<number>(0); // 세로 값 (행 개수)
  const [columns, setColumns] = useState<number>(0); // 가로 값 (열 개수)
  const [peopleCount, setPeopleCount] = useState<number>(0); // 인원 수
  const [desks, setDesks] = useState<Desk[][]>([]); // 자리 array

  // 자리 배치 생성 함수
  const createDesks = () => {
    if (rows < 1 || columns < 1) {
      alert("행과 열 값은 1 이상이어야 합니다!");
      return;
    }
    const newDesks: Desk[][] = [];
    for (let row = 0; row < rows; row++) {
      const deskRow: Desk[] = [];
      for (let col = 0; col < columns; col++) {
        deskRow.push({
          id: `${row}-${col}`,
          isActive: true,
          assignedNumber: undefined,
        });
      }
      newDesks.push(deskRow);
    }
    setDesks(newDesks);
  };

  // 책상 클릭(활성화/비활성화) 함수
  const toggleDeskState = (row: number, col: number) => {
    const updatedDesks = desks.map((deskRow, rowIndex) =>
      deskRow.map((desk, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return {
            ...desk,
            isActive: !desk.isActive,
            assignedNumber: undefined,
          };
        }
        return desk;
      }),
    );
    setDesks(updatedDesks);
  };

  // 인원을 랜덤하게 활성화된 자리 배치
  const assignRandomSeats = () => {
    // 활성화된 책상만 필터링
    const activeDesks = desks.flat().filter((desk) => desk.isActive);

    if (peopleCount < 1) {
      alert("인원 수는 1 이상이어야 합니다!");
      return;
    }

    if (activeDesks.length !== peopleCount) {
      alert(
        `활성화된 책상의 수(${activeDesks.length})와 인원 수(${peopleCount})가 일치하지 않습니다!`,
      );
      return;
    }

    // 비활성화된 모든 기존 자리 초기화
    const clearedDesks = desks.map((deskRow) =>
      deskRow.map((desk) => ({ ...desk, assignedNumber: undefined })),
    );
    setDesks(clearedDesks);

    // 랜덤 자리 배치
    const shuffledDesks = [...activeDesks].sort(() => Math.random() - 0.5); // 랜덤 섞기
    const seatsToAssign = shuffledDesks.slice(0, peopleCount); // 필요한 만큼만 가져오기

    const updatedDesks = desks.map((deskRow) =>
      deskRow.map((desk) => {
        const seat = seatsToAssign.find((s) => s.id === desk.id);
        return seat
          ? { ...desk, assignedNumber: seatsToAssign.indexOf(seat) + 1 }
          : desk;
      }),
    );

    setDesks(updatedDesks);
  };

  // 자리 텍스트 출력 함수
  const renderSeatLayout = () => {
    if (desks.length === 0) return "배치된 자리가 없습니다.";

    return desks
      .map(
        (deskRow) =>
          deskRow
            .map((desk) =>
              desk.isActive
                ? desk.assignedNumber
                  ? desk.assignedNumber.toString().padStart(2, "0") // 자리 번호 출력
                  : "▬"
                : "X",
            )
            .join(" "), // 각 열 사이에 공백 추가
      )
      .join("\n"); // 각 행을 줄바꿈으로 구분
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">학교 자리 배치</h1>

      {/* 자리 입력 필드 */}
      <div className="mb-6 flex gap-4">
        <div>
          <label className="block text-gray-700">가로 (열):</label>
          <input
            type="number"
            value={columns || ""}
            min={1}
            onChange={(e) => setColumns(Number(e.target.value))}
            className="border p-2 rounded w-20"
          />
        </div>
        <div>
          <label className="block text-gray-700">세로 (행):</label>
          <input
            type="number"
            value={rows || ""}
            min={1}
            onChange={(e) => setRows(Number(e.target.value))}
            className="border p-2 rounded w-20"
          />
        </div>
        <button
          onClick={createDesks} // 자리 배치 생성 버튼
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          자리 배치 생성
        </button>
      </div>

      {/* 인원 입력 */}
      <div className="mb-6 flex gap-4">
        <div>
          <label className="block text-gray-700">인원 수:</label>
          <input
            type="number"
            value={peopleCount || ""}
            min={1}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="border p-2 rounded w-20"
          />
        </div>
        <button
          onClick={assignRandomSeats} // 랜덤 자리 배치 버튼
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          랜덤 자리 배치
        </button>
      </div>

      {/* 자리 배치 캔버스 */}
      <div
        className="grid gap-2 outline outline-2 outline-black p-3 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${columns}, 100px)`,
          gridAutoRows: "100px",
        }}
      >
        {desks.map((deskRow, rowIndex) =>
          deskRow.map((desk, colIndex) => (
            <div
              key={desk.id}
              onClick={() => toggleDeskState(rowIndex, colIndex)}
              className={`flex items-center justify-center border rounded ${
                desk.isActive ? "bg-green-300" : "bg-gray-400"
              }`}
              style={{ cursor: "pointer" }}
            >
              {desk.assignedNumber ?? desk.id}
            </div>
          )),
        )}
      </div>

      {/* 자리 배치 텍스트 */}
      <div className="bg-gray-100 p-4 rounded mt-6">
        <h2 className="text-lg font-bold mb-2">배치 텍스트 보기:</h2>
        <pre className="whitespace-pre bg-white border rounded p-4 overflow-x-auto">
          {renderSeatLayout()}
        </pre>
      </div>
    </div>
  );
};

export default SchoolSeatSelector;
