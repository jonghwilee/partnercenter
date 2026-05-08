import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { cn } from "../lib/utils";

const inquiryTypes = [
  { value: "settlement", label: "정산 내역 문의" },
  { value: "fee", label: "수수료 문의" },
  { value: "point", label: "포인트 문의" },
  { value: "etc", label: "기타" },
];

export default function Inquiry() {
  const [type, setType] = useState("settlement");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1:1 문의</CardTitle>
          <CardDescription>정산 내역에 대한 문의/이슈를 등록해 주세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">문의 유형</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="문의 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  {inquiryTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">제목</label>
              <Input
                placeholder="문의 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">문의 내용</label>
            <textarea
              placeholder="문의 내용을 상세히 입력해 주세요. 정산 기간, 브랜드, 매장 등 관련 정보를 함께 기재해 주시면 빠른 답변이 가능합니다."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className={cn(
                "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">취소</Button>
            <Button>문의 등록</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
