package com.unkapps.family.tree.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.unkapps.family.tree.dto.web.FamilyDto;
import com.unkapps.family.tree.dto.web.save.FamilyForSaveDto;
import com.unkapps.family.tree.service.FamilyService;

@RestController
@RequestMapping("/api/f")
public class FamilyResource {
	@Autowired
	private FamilyService familyService;
	
	@PostMapping(path = "/", produces = "application/json")
	@Transactional
	public @ResponseBody FamilyDto get(@RequestBody FamilyForSaveDto dto) {
		return this.familyService.save(dto);
	}
	
	@GetMapping(path = "/{familyId}", produces = "application/json")
	@Transactional(readOnly = true)
	public @ResponseBody FamilyDto get(@PathVariable(required = true) Long familyId) {
		return this.familyService.get(familyId);
	}
}
