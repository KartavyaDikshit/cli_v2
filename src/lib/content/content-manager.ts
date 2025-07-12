interface ReportMetadata {
  id: string;
  title: string;
  language: string;
  version: number;
  category: string[];
  tags: string[];
  scheduledPublishDate?: Date;
  content: string;
}

class ContentManager {
  private reports: Map<string, ReportMetadata[]> = new Map(); // Map<reportId, versions[]>

  constructor() {
    // Initialize with some dummy data or load from a persistent store
  }

  /**
   * Adds or updates report metadata and content.
   * Handles new versions for translations.
   */
  public saveReport(report: ReportMetadata): ReportMetadata {
    const reportId = report.id;
    if (!this.reports.has(reportId)) {
      this.reports.set(reportId, []);
    }
    const versions = this.reports.get(reportId)!;

    // Check for existing version for the same language
    const existingIndex = versions.findIndex(r => r.language === report.language && r.version === report.version);
    if (existingIndex > -1) {
      versions[existingIndex] = report; // Update existing version
    } else {
      versions.push(report); // Add new version
    }
    console.log(`Report ${report.id} (version ${report.version}, lang ${report.language}) saved.`);
    return report;
  }

  /**
   * Retrieves a specific version of a report by ID and language.
   */
  public getReport(id: string, language: string, version?: number): ReportMetadata | undefined {
    const versions = this.reports.get(id);
    if (!versions) {
      return undefined;
    }
    if (version !== undefined) {
      return versions.find(r => r.language === language && r.version === version);
    } else {
      // Return the latest version for the given language if no version specified
      const langVersions = versions.filter(r => r.language === language);
      if (langVersions.length === 0) return undefined;
      return langVersions.sort((a, b) => b.version - a.version)[0];
    }
  }

  /**
   * Schedules content for publication.
   * In a real app, this would interact with a job scheduler.
   */
  public scheduleContent(reportId: string, language: string, publishDate: Date): boolean {
    const versions = this.reports.get(reportId);
    if (!versions) return false;

    const report = versions.find(r => r.language === language);
    if (report) {
      report.scheduledPublishDate = publishDate;
      console.log(`Report ${reportId} (lang ${language}) scheduled for ${publishDate.toISOString()}`);
      return true;
    }
    return false;
  }

  /**
   * Retrieves reports by category or tag.
   */
  public filterReports(options: { category?: string; tag?: string; language?: string }): ReportMetadata[] {
    const filtered: ReportMetadata[] = [];
    this.reports.forEach(versions => {
      versions.forEach(report => {
        let matches = true;
        if (options.category && !report.category.includes(options.category)) {
          matches = false;
        }
        if (options.tag && !report.tags.includes(options.tag)) {
          matches = false;
        }
        if (options.language && report.language !== options.language) {
          matches = false;
        }
        if (matches) {
          filtered.push(report);
        }
      });
    });
    // Deduplicate if multiple versions of the same report match criteria
    const uniqueReports = new Map<string, ReportMetadata>();
    filtered.forEach(report => {
      const key = `${report.id}-${report.language}`;
      if (!uniqueReports.has(key) || uniqueReports.get(key)!.version < report.version) {
        uniqueReports.set(key, report);
      }
    });
    return Array.from(uniqueReports.values());
  }

  /**
   * Lists all available reports, typically the latest version of each language.
   */
  public listAllReports(): ReportMetadata[] {
    const allReports: ReportMetadata[] = [];
    this.reports.forEach(versions => {
      const latestVersionsPerLang = new Map<string, ReportMetadata>();
      versions.forEach(report => {
        const currentLatest = latestVersionsPerLang.get(report.language);
        if (!currentLatest || report.version > currentLatest.version) {
          latestVersionsPerLang.set(report.language, report);
        }
      });
      latestVersionsPerLang.forEach(report => allReports.push(report));
    });
    return allReports;
  }
}

export const contentManager = new ContentManager();