import { Form, Stack, Col, Row, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Creatable from "react-select/creatable";
import { NoteData, Tag } from "../types";
import { v4 as uuidV4 } from "uuid";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  aviableTags: Tag[];
} & Partial<NoteData>;

const NoteForm: React.FunctionComponent<NoteFormProps> = ({
  onSubmit,
  addTag,
  aviableTags,
  title = "",
  markdown = "",
  tags = [],
}) => {
  let titleRef = useRef<HTMLInputElement>(null);
  let markdownRef = useRef<HTMLTextAreaElement>(null);
  let [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  let naviGate = useNavigate();
  function handlSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    naviGate("..");
  }
  return (
    <Form onSubmit={handlSubmit}>
      <Stack gap={3}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Creatable
                isMulti
                onCreateOption={(label) => {
                  let newTag = { id: uuidV4(), label };
                  addTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({ label: tag.label, id: tag.value }))
                  );
                }}
                options={aviableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            defaultValue={markdown}
            required
            as="textarea"
            rows={15}
            ref={markdownRef}
          />
        </Form.Group>
      </Stack>
      <Stack direction="horizontal" gap={2} className="justify-content-end">
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Link to="/">
          <Button type="button" variant="outline-secondary">
            Cancel
          </Button>
        </Link>
      </Stack>
    </Form>
  );
};

export default NoteForm;
