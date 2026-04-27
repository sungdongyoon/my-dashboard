"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/src/components/ui/field";
import React from "react";

const TodoList = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="">
        <h1 className="text-[2rem]">To Do</h1>
        <Badge className="bg-orange-300 text-orange-50">2026-04-27</Badge>

        <span className="text-semibold text-gray-500 text-[0.8rem]"></span>
      </div>

      <div className="border-t w-full h-[1px]"></div>

      <div className="flex gap-3">
        <Button size="sm" className="bg-blue-700 text-blue-50">
          New Task
        </Button>
        <Button size="sm" variant="outline">
          Filters
        </Button>
        <Button size="sm" variant="outline">
          Date
        </Button>
      </div>

      <div className="flex flex-col gap-3 overflow-scroll">
        <FieldLabel>
          <Field orientation="horizontal">
            <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
            <FieldContent>
              <FieldTitle>Enable notifications</FieldTitle>
              <FieldDescription>
                You can enable or disable notifications at any time.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <FieldLabel>
          <Field orientation="horizontal">
            <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
            <FieldContent>
              <FieldTitle>Enable notifications</FieldTitle>
              <FieldDescription>
                You can enable or disable notifications at any time.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <FieldLabel>
          <Field orientation="horizontal">
            <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
            <FieldContent>
              <FieldTitle>Enable notifications</FieldTitle>
              <FieldDescription>
                You can enable or disable notifications at any time.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </div>
    </div>
  );
};

export default TodoList;
