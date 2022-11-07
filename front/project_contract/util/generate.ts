import {
  blobToFile,
  getBlob,
  loadFile
} from 'util/FileUtil';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { ProjectContractParameter } from 'project_contract/parameter';
import { fileToView } from 'file-item';
import { projectContractData } from 'project_contract/util/data';

export function generate(values: ProjectContractParameter,
                         callback: (values: ProjectContractParameter) => void
) {
  loadFile(`${location.origin}/file-item/template?fileName=contract_template.docx`,
    async function (error,
                    content
    ) {
      if (error) { throw error; }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks:    true,
      });
      const data = await projectContractData.setData(values);
      doc.setData(data);
      doc.render(data);
      values.file = fileToView(blobToFile(getBlob(doc), `계약서-${data.serviceName}.docx`));
      callback && callback(values);
    });
}
