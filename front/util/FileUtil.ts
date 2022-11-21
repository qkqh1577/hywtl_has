import PizZipUtils from 'pizzip/utils';
import Docxtemplater from 'docxtemplater';
import { ProjectSystemEstimateParameter } from 'project_estimate/parameter';
import { ProjectVO } from 'project/domain';
import PizZip from 'pizzip';
import { fileToView } from 'file-item';
import { projectEstimateData } from 'project_estimate/util/data';
import { projectContractData } from 'project_contract/util/data';
import { ProjectContractParameter } from 'project_contract/parameter';
import { EstimateContentVariableVO } from 'admin/estimate/content/domain';

export const generateFile = ({
                               values,
                               callback,
                               project,
                               templateFileName,
                               type,
                               variableList
                             }: FileUtil) => {
  loadFile(
    `${location.origin}/file-item/template?fileName=${templateFileName}.docx`,
    async function (error,
                    content
    ) {
      if (error) { throw error; }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks:    true,
      });

      if (type === 'estimate') {
        const data = await projectEstimateData.setData(values as ProjectSystemEstimateParameter, variableList, project as ProjectVO);
        doc.setData(data);
        doc.render(data);
        values.file = fileToView(blobToFile(getBlob(doc), `견적서-${data.projectName}-${data.estimateNumber}.docx`));
      }
      else {
        const data = await projectContractData.setData(values as ProjectContractParameter);
        doc.setData(data);
        doc.render(data);
        values.file = fileToView(blobToFile(getBlob(doc), `계약서-${data.serviceName}.docx`));
      }
      callback && callback(values);
    }
  );
};

export function loadFile(url,
                         callback
) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const blobToFile = (blob: Blob,
                           fileName: string
): File => {
  return new File([blob], fileName, {
    type:         blob.type,
    lastModified: Date.now(),
  });
};

export function getBlob(doc: Docxtemplater): Blob {
  return doc.getZip()
            .generate({
              type:        'blob',
              mimeType:
                           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              compression: 'DEFLATE',
            });
}

export class FileUtil {
  constructor(private _values: ProjectSystemEstimateParameter | ProjectContractParameter,
              private _callback: (values: ProjectSystemEstimateParameter | ProjectContractParameter) => void,
              private _project: ProjectVO | null,
              private _templateFileName: string,
              private _type: string,
              private _variableList
  ) {
    this._values = _values;
    this._callback = _callback;
    this._project = _project;
    this._templateFileName = _templateFileName;
    this._type = _type;
    this._variableList = _variableList;
  }

  get values(): ProjectSystemEstimateParameter | ProjectContractParameter {
    return this._values;
  }

  set values(value: ProjectSystemEstimateParameter | ProjectContractParameter) {
    this._values = value;
  }

  get callback(): (values: ProjectSystemEstimateParameter | ProjectContractParameter) => void {
    return this._callback;
  }

  get project(): ProjectVO | null {
    return this._project;
  }

  set project(value: ProjectVO | null) {
    this._project = value;
  }

  get templateFileName(): string {
    return this._templateFileName;
  }

  get type(): any {
    return this._type;
  }

  set type(value: any) {
    this._type = value;
  }

  set variableList(value: EstimateContentVariableVO[]) {
    this._variableList = value;
  }

  get variableList(): EstimateContentVariableVO[] {
    return this._variableList;
  }

}

